import { useQuery } from "@tanstack/react-query"
import { Octokit } from "@octokit/rest"
import { accessTokenRepository } from "../repositories/accessTokenRepository"

const octokit = new Octokit({ auth: accessTokenRepository.get() })

export const useHasIssuesReposQuery = () => {
	return useQuery({
		queryKey: ['repos'],
		queryFn: async () => {
			const response = await octokit.repos.listForAuthenticatedUser()
			return response.data
				.filter((repo) => repo.open_issues_count > 0)
		},
		enabled: !!accessTokenRepository.get(),
	})
}

export const usePullsQuery = ({ owner, repo }: { owner: string, repo: string }) => {
	return useQuery({
		queryKey: ['pulls'],
		queryFn: async () => {
			const response = await octokit.pulls.list({
				owner,
				repo,
			})
			return response.data
		},
	})
}