import gql from 'graphql-tag';

export const GET_USERLIST_QUERY = gql`
	query LoginUser($filters: UserFilters) {
		users(filters: $filters) {
			uniqueID
			email
		}
	}
`;

export const GET_USER_ID_QUERY = gql`
	query LoginUser($filters: UserFilters) {
		users(filters: $filters) {
			ID
			password
			email
			mobileNo
			name
			description
			status
			isVerified
			signUpMethod
			uniqueID
			referenceID
			avatar
			roleID
			userName
			following
			follower
		}
	}
`;

export const LOGIN_USER_QUERY = gql`
	query auth($email: String, $password: String) {
		auth(email: $email, password: $password) {
			ID
			token
			refreshToken
			creativeToken
			userName
			avatar
			status
			isVerified
			isFollowing
			email
			name
			uniqueID
			password
			mobileNo
		}
	}
`;

export const SAVE_USER_MUTATION = gql`
	mutation upsertAuth($userinput: UserInput) {
		upsertAuth(auth: $userinput) {
			ID
			token
			refreshToken
			creativeToken
			name
			userName
			email
			description
			status
			password
			avatar
			isVerified
			signUpMethod
			userCounter
			isPaidSubscription
			paidSubscription {
				subscriptionID
				status
			}
			following
			follower
			freeArticles {
				slug
				description
				title
			}
			ipAddress
		}
	}
`;

export const CREATE_NEW_USER = gql`
	mutation CreateUser(
		$name: String
		$email: String
		$password: String
		$signUpMethod: String
		$mobileNo: String
		$dob: String
		$gender: String
		$parentCategories: [UsersParentCategoryInput]
		$subCategories: [SubcategoriesInput]
		$avatar: String
		$referenceID: String
	) {
		upsertAuth(
			auth: {
				name: $name
				email: $email
				password: $password
				signUpMethod: $signUpMethod
				mobileNo: $mobileNo
				dob: $dob
				gender: $gender
				parentCategories: $parentCategories
				subCategories: $subCategories
				avatar: $avatar
				referenceID: $referenceID
			}
		) {
			name
			email
			password
			dob
			gender
			token
			avatar
			description
			ID
			referenceID
			signUpMethod
			status
			uniqueID
			userName
			isVerified
		}
	}
`;
