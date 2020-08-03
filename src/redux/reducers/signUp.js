const initialState = {
	isLogin: false,
	user: {
		username: '',
		email: '',
    password: '',
    password_confirmation: '',
	}
};
const signUpReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CREATE_USER': return {
			...state.user,
			isLogin: true,
			user: {
				username: action.username,
				email: action.email,
        password: action.password,
        password_confirmation: action.password,
			},
		};
		case 'CREATE_USER_ERROR': return {
			isLogin: false,
		};
		default: return state;
	}
};

export default signUpReducer;
