import { db } from './config';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  query,
  collection,
  where,
  getDocs,
  limit,
} from 'firebase/firestore';
import { IGroupService } from '../../services/group';
import { Group, Member } from '../../types';

const generatePin = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateId = () => {
  // crypto.randomUUID() requires a secure context (HTTPS).
  // Fall back to a Math.random-based UUID v4 for http:// local testing.
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export class GroupRepository implements IGroupService {
  async createGroup(name: string, firstMemberName: string): Promise<Group> {
    const groupId = generateId();
    const pin = generatePin();
    const now = Date.now();

    const firstMember: Member = {
      id: generateId(),
      displayName: firstMemberName,
      joinedAt: now,
    };

    const groupName = name || 'New Trip';

    const newGroup: Group = {
      id: groupId,
      name: groupName,
      normalizeName: groupName.toLowerCase(),
      pin: pin,
      createdAt: now,
      updatedAt: now,
      currency: 'VND',
      members: [firstMember],
    };

    await setDoc(doc(db, 'groups', groupId), newGroup);
    return newGroup;
  }

  async getGroup(id: string): Promise<Group | null> {
    const docRef = doc(db, 'groups', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Group;
    } else {
      return null;
    }
  }

  async joinGroup(groupId: string, memberName: string): Promise<Member> {
    // Check if a member with the same name (case-insensitive) already exists
    const group = await this.getGroup(groupId);
    if (group) {
      const existing = group.members.find(
        (m) => m.displayName.toLowerCase() === memberName.toLowerCase(),
      );
      if (existing) return existing; // Claim the existing member — no duplicate created
    }

    const newMember: Member = {
      id: generateId(),
      displayName: memberName,
      joinedAt: Date.now(),
    };

    const groupRef = doc(db, 'groups', groupId);
    await updateDoc(groupRef, {
      members: arrayUnion(newMember),
    });
    return newMember;
  }

  async findGroupIdByPin(pin: string): Promise<string | null> {
    const q = query(collection(db, 'groups'), where('pin', '==', pin), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].id;
    }
    return null;
  }

  async updateGroupName(groupId: string, newName: string): Promise<void> {
    const groupRef = doc(db, 'groups', groupId);
    await updateDoc(groupRef, {
      name: newName,
      normalizeName: newName.toLowerCase(),
      updatedAt: Date.now(),
    });
  }
}

// Directly export the Firestore implementation
// The environment (local vs prod) is handled by the firebase config initialization
export const groupService: IGroupService = new GroupRepository();
