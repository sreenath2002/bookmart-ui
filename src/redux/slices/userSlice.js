// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  id: '',
  firstName: '',
  lastName: '',
  path:'',
  mobile: '',
  role: '',
  profileImage: ''
  // role:''

};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.profileImage=action.payload.profileImage;
      state.path=action.payload.path;
      state.firstName=action.payload.firstName;
      state.lastName=action.payload.lastName;
      state.mobile=action.payload.mobile
      state.role=action.payload.role
     
      // state.role=action.payload.role;
      console.log('Logged in user email:', action.payload.email);
      console.log('Logged in user id:', action.payload.id);
    //   console.log('Profile image',action.payload.profileImage)
      console.log('Path',action.payload.path)
      console.log('Fullname',action.payload.firstName)
      console.log('Fullname',action.payload.lastName)
      console.log('Fullname',action.payload.mobile)
      console.log(action.payload.profileimage)
    },
    // clearUser: (state) => {
    //   state.email = '';
    //   state.id = '';

    // }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;