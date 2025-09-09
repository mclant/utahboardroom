import { createTheme } from "@mui/material/styles"

// Extend the Material-UI theme interface to include custom colors
declare module "@mui/material/styles" {
  interface Palette {
    accent1: Palette["primary"]
    accent2: Palette["primary"]
    accent3: Palette["primary"]
    textCustom: {
      primary: string
    }
  }

  interface PaletteOptions {
    accent1?: PaletteOptions["primary"]
    accent2?: PaletteOptions["primary"]
    accent3?: PaletteOptions["primary"]
    textCustom?: {
      primary?: string
    }
  }
}

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0A0A0B", // Deep space black
    },
    secondary: {
      main: "#1A1A1D", // Charcoal gray
    },
    accent1: {
      main: "#00D4FF", // Electric cyan
    },
    accent2: {
      main: "#7C3AED", // Tech purple
    },
    accent3: {
      main: "#FF6B35", // Matrix green
    },
    textCustom: {
      primary: "#E4E4E7", // Cool light gray
    },
    background: {
      default: "#0A0A0B",
      paper: "#1A1A1D",
    },
    text: {
      primary: "#E4E4E7",
      secondary: "#A1A1AA",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiOutlinedInput-root": {
            backgroundColor: theme.palette.secondary.main,
            borderRadius: "12px",
            fontFamily: '"Bai Jamjuree", "Inter", sans-serif',
            color: theme.palette.textCustom.primary,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "& fieldset": {
              borderColor: theme.palette.accent1.main,
              borderWidth: "2px",
            },
            "&:hover fieldset": {
              borderColor: theme.palette.accent1.main,
              boxShadow: `0 0 10px ${theme.palette.accent3.main}33`,
              opacity: 0.7,
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.accent1.main,
              boxShadow: `0 0 15px ${theme.palette.accent1.main}66`,
            },
            "&.Mui-error fieldset": {
              borderColor: theme.palette.accent3.main,
              boxShadow: `0 0 10px ${theme.palette.accent3.main}33`,
            },
          },
          "& .MuiInputLabel-root": {
            color: theme.palette.textCustom.primary,
            fontFamily: '"Bai Jamjuree", "Inter", sans-serif',
            "&.Mui-focused": {
              color: theme.palette.accent1.main,
            },
            "&.Mui-error": {
              color: theme.palette.accent3.main,
            },
          },
          "& .MuiInputBase-input": {
            color: theme.palette.textCustom.primary,
            fontSize: "16px",
            fontFamily: '"Bai Jamjuree", "Inter", sans-serif',
            padding: "14px 16px",
            "&::placeholder": {
              color: theme.palette.text.secondary,
              opacity: 0.7,
            },
          },
          "& .MuiFormHelperText-root": {
            marginTop: "8px",
            fontSize: "14px",
            "&.Mui-error": {
              color: theme.palette.accent3.main,
            },
          },
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          borderRadius: "12px",
          textTransform: "none",
          fontFamily: theme.typography.h6.fontFamily,
          fontWeight: 600,
          transition: "all 0.3s ease",
          ...(ownerState.variant === "contained" && {
            ...(ownerState.color === "primary" && {
              backgroundColor: theme.palette.accent1.main,
              color: theme.palette.primary.main,
              "&:hover": {
                opacity: 0.7,
                boxShadow: `0 8px 25px ${theme.palette.accent3.main}33`,
              },
            }),
          }),
          ...(ownerState.variant === "outlined" && {
            ...(ownerState.color === "primary" && {
              backgroundColor: "transparent",
              color: theme.palette.accent1.main,
              border: `1px solid ${theme.palette.accent1.main}`,
              "&:hover": {
                opacity: 0.7,
                boxShadow: `0 8px 25px ${theme.palette.accent3.main}33`,
              },
            }),
          }),
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          fontFamily: '"Bai Jamjuree", "Inter", sans-serif',
          fontWeight: 600,
          textDecoration: "none",
          cursor: "pointer",
          "&:hover": {
            opacity: 0.7,
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.secondary.main,
          borderRadius: "12px",
          padding: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
        }),
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.secondary.main,
        }),
      },
    },
  },
  typography: {
    fontFamily:
      '"Bai Jamjuree", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      textAlign: "center",
      fontFamily: '"Bai Jamjuree", "Inter", sans-serif',
      fontWeight: 700,
      color: "#E4E4E7",
    },
    h2: {
      textAlign: "center",
      fontFamily: '"Bai Jamjuree", "Inter", sans-serif',
      fontWeight: 600,
      color: "#E4E4E7",
    },
    h3: {
      textAlign: "center",
      fontFamily: '"Bai Jamjuree", "Inter", sans-serif',
      fontWeight: 600,
      color: "#E4E4E7",
    },
    h4: {
      textAlign: "center",
      fontFamily: '"Bai Jamjuree", "Inter", sans-serif',
      fontWeight: 500,
      color: "#E4E4E7",
    },
    h5: {
      textAlign: "center",
      fontFamily: '"Bai Jamjuree", "Inter", sans-serif',
      fontWeight: 500,
      color: "#E4E4E7",
    },
    h6: {
      textAlign: "center",
      fontFamily: '"Bai Jamjuree", "Inter", sans-serif',
      fontWeight: 500,
      color: "#E4E4E7",
    },
    body1: {
      textAlign: "center",
      fontFamily: '"Inter", "Bai Jamjuree", sans-serif',
      color: "#E4E4E7",
    },
    body2: {
      textAlign: "center",
      fontFamily: '"Inter", "Bai Jamjuree", sans-serif',
      color: "#E4E4E7",
    },
  },
})
