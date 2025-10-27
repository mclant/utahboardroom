import BasicPageLayout from "@/components/BasicPageLayout"
import { useGetWaitlistUsers } from "@/db"
import {
  Card,
  Table,
  TableBody,
  TableCell,
  Box,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material"
import { useQueryClient } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"

export const Route = createFileRoute("/dashboard/admin/waitlist")({
  component: RouteComponent,
})

function RouteComponent() {
  const queryClient = useQueryClient()
  const { data: waitlistUsersData, isFetching: isLoadingWaitlistUsers } =
    useGetWaitlistUsers()
  // @ts-ignore
  const waitlistUsers = waitlistUsersData?.data || []
  // @ts-ignore
  const waitlistUsersCount = waitlistUsers?.length || 0

  // Pagination state
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Handlers for pagination
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Calculate paginated data
  const paginatedUsers = waitlistUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  return (
    <BasicPageLayout title="Waitlist">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <Card>
          <Typography variant="body1" fontWeight={700}>
            Waitlist total count
          </Typography>
          {isLoadingWaitlistUsers ? (
            <CircularProgress size={56} />
          ) : (
            <Typography variant="h3" fontWeight={700}>
              {waitlistUsersCount}
            </Typography>
          )}
        </Card>
        <Button
          variant="contained"
          color="primary"
          disabled={isLoadingWaitlistUsers}
          onClick={() => {
            queryClient.invalidateQueries({
              queryKey: ["getWaitlistUsers"],
            })
          }}
        >
          Refresh
        </Button>
      </Box>
      <Typography variant="body1" fontWeight={700}>
        Waitlist feedback
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Feedback</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((waitlistUser: any) => (
              <TableRow
                key={waitlistUser?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {waitlistUser?.full_name}
                </TableCell>
                <TableCell>{waitlistUser?.email}</TableCell>
                <TableCell align="right">
                  {waitlistUser?.UserFeedback?.[0]?.feedback}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={waitlistUsersCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 100]}
        />
      </Box>
    </BasicPageLayout>
  )
}
