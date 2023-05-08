import { Button, Center } from "@chakra-ui/react"
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { provider } from "../utils/firebase";
import { LinkIcon } from "@chakra-ui/icons";

const auth = getAuth()

export const SignIn = () => {
	const handleClickSignInWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access Google APIs.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				if (!credential || !result) return
				const token = credential.accessToken;
				console.debug(token)

				// The signed-in user info.
				const user = result.user;
				console.debug(user)
				// IdP data available using getAdditionalUserInfo(result)
				// ...
			}).catch((error) => {
				console.error(error)
				// // Handle Errors here.
				// const errorCode = error.code;
				// const errorMessage = error.message;
				// // The email of the user's account used.
				// const email = error.customData.email;
				// // The AuthCredential type that was used.
				// const credential = GoogleAuthProvider.credentialFromError(error);
				// // ...
			});
	}

	return (
		<Center>
			<Button onClick={handleClickSignInWithGoogle} colorScheme="blue">
				<LinkIcon fontSize="sm" mr="2" />
				Sign in with Google
			</Button>
		</Center>
	) 
}