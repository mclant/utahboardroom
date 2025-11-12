import {
	Box,
	Button,
	Card,
	CircularProgress,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
  useTheme,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import BasicPageLayout from "@/components/BasicPageLayout";
import { useGetBoardVotes, useGetWaitlistUsers } from "@/db";

export const Route = createFileRoute("/dashboard/admin/surveys")({
	component: RouteComponent,
});

function RouteComponent() {
  const theme = useTheme()
  const queryClient = useQueryClient()
	const { data: boardVotesData, isFetching: isLoadingBoardVotes } =
		useGetBoardVotes();
	// @ts-ignore
	const boardVotes = boardVotesData?.data || [];
	console.log("boardVotes:", boardVotes);
	// @ts-ignore
	const boardVotesCount = boardVotes?.length || 0;

  const aggregatedVotes = boardVotes.reduce((acc, person) => {
    // Iterate through each board in the person's votesMap
    Object.values(person.votesMap).forEach(({ name, votes }) => {
      acc[name] = (acc[name] || 0) + votes;
    });
    return acc;
  }, {});
  
  // Convert to array format
  const boardVotesResultList = Object.entries(aggregatedVotes).map(([board, votes]) => ({
    board,
    votes
  }));
  console.log("boardVotesResultList:", boardVotesResultList);

	return (
		<BasicPageLayout title="Surveys">
			<Box
				sx={{
					width: "100%",
					display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
					gap: 2,
				}}
        >
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <Typography variant="h6" fontWeight={700}>Total responses: {isLoadingBoardVotes ? <CircularProgress size={20} /> : boardVotesCount}</Typography>
        <Button variant="contained" color="primary" onClick={() => {
          queryClient.invalidateQueries({
            queryKey: ["getBoardVotes"],
          })
        }} loading={isLoadingBoardVotes}>Refresh</Button>
        </Box>
        <BarChart
          style={{ width: '100%', maxWidth: '500px', maxHeight: '500px', height: '500px' }}
          responsive
          data={boardVotesResultList}
          layout="vertical"
        >
          <XAxis type="number" dataKey="votes" />
          <YAxis type="category" dataKey="board" width={200} color={theme.palette.text.primary} fill={theme.palette.text.primary} />
          <Bar dataKey="votes" fill={theme.palette.accent2.main} label={{ position: 'right', fill: theme.palette.text.primary }} />
        </BarChart>
      </Box>
		</BasicPageLayout>
	);
}
