import { db } from './config';
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { IGroupService } from '../../services/group';
import { Group, Member } from '../../types';

const generatePin = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateId = () => {
  return crypto.randomUUID();
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

  async joinGroup(groupId: string, memberName: string): Promise<void> {
    const memberId = generateId();
    const now = Date.now();

    const newMember: Member = {
      id: memberId,
      displayName: memberName,
      joinedAt: now,
    };

    const groupRef = doc(db, 'groups', groupId);

    await updateDoc(groupRef, {
      members: arrayUnion(newMember),
    });
  }
}

// Directly export the Firestore implementation
// The environment (local vs prod) is handled by the firebase config initialization
export const groupService: IGroupService = new GroupRepository();
