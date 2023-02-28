import { UserName } from "../domain/user";
import { useAuth } from "../services/authAdapter";
import { useUserStorage } from "../services/storageAdapter";

import { AuthenticationService, UserStorageService } from "./ports";

export function useAuthenticate() {
  
  const storage: UserStorageService = useUserStorage();
  const auth: AuthenticationService = useAuth();

   async function authenticate(name: UserName, email: Email): Promise<void> {
    const user = await auth.auth(name, email);
    storage.updateUser(user);
  }

  return {
    user: storage.user,
    authenticate,
  };
}
