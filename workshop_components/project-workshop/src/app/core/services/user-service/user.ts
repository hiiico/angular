import { Injectable } from '@angular/core';
import { User } from '../../../shared/interfaces/user';
import { UserCredentials } from '../../../shared/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // import from DB but it's hardcoded
  private users: UserCredentials[] = [];

  register(user: UserCredentials): User {
    this.users.push(user);
    // separate password and user
    const { password, ...publicUser} = user;
    // return user without password
    // must hash password before send to DB
    return publicUser;
  }

  validateCredentials(email: string, password: string): User | null {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );

      if(!user) return null;
      
      const { password:_, ...publicUser} = user; // _ means that the password isn't used
      // return user without password
      // must hash password before send to DB
      return publicUser;
  }
}
