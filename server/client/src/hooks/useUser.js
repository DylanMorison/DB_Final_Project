import { useEffect } from 'react';
import { auth, createUserDoc } from '../Firebase/Firebase';

const useUser = (
  handler,
  currentUser,
) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const authUser = await createUserDoc(user);
        handler({ authUser });
      } else {
        auth.signOut();
        handler(null);
      }
    });

    return () => unsubscribe();
  }, [currentUser]);
};
export default useUser;
