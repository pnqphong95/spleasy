import { Group } from '../types';

export interface IGroupService {
  createGroup(name: string, firstMemberName: string): Promise<Group>;
  getGroup(id: string): Promise<Group | null>;
  joinGroup(groupId: string, memberName: string): Promise<void>;
  findGroupIdByPin(pin: string): Promise<string | null>;
  updateGroupName(groupId: string, newName: string): Promise<void>;
}
