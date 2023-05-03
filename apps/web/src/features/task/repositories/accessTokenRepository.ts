export const accessTokenRepository = {
	get: () => {
		return localStorage.getItem('accessToken')
	},
	set: (accessToken: string) => {
		localStorage.setItem('accessToken', accessToken)
	},
	remove: () => {
		localStorage.removeItem('accessToken')
	}
}