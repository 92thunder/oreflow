import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Card, CardBody, Link, List, ListItem, UnorderedList } from "@chakra-ui/react";
import { RestEndpointMethodTypes } from "@octokit/rest";
import { FC } from "react";
import { usePullsQuery } from "../queries/github";

const Pulls: FC<Params> = ({ repo }) => {
	const owner = repo.owner.login
	const { data: pulls } = usePullsQuery({
		owner: owner,
		repo: repo.name
	})
	if (!pulls) return null

	return (
		<AccordionPanel>
			<UnorderedList>
				{pulls.map((pull) => (
					<ListItem key={pull.id}>
						<Link href={pull.url}>{pull.title}</Link>
					</ListItem>
				))}
			</UnorderedList>
		</AccordionPanel>
	)
}

type Params = {
	repo: 
		RestEndpointMethodTypes["repos"]["listForAuthenticatedUser"]["response"]["data"][0]
}

export const GithubRepoTasks: FC<Params> = ({ repo }) => {
	return (
		<Card size="sm">
			<CardBody>
				<Accordion allowMultiple>
					<AccordionItem border="none">
						<AccordionButton p="0">
							{repo.name}
							<AccordionIcon />
						</AccordionButton>
						<Pulls repo={repo} />
					</AccordionItem>
				</Accordion>
			</CardBody>
		</Card>
	)
}