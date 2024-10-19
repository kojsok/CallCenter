import { LoginSchema } from "@/utils/schemasTypes";
import { Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ControlledField from "../common/ControlledField/ControlledField";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { loginThunk } from "@/store/authSlices/authSlice";
import { signFormRules } from "./signFormRules";

const SignInForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { control, handleSubmit, reset, formState: { errors }, clearErrors } = useForm<LoginSchema>({
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = async (loginData: LoginSchema) => {
    console.log(loginData)
    await dispatch(loginThunk(loginData))
    reset()
  }

  //управляем открытием закрытием модального окна
  const [openForm, setOpenForm] = useState(false)
  const handleOpen = () => {
    setOpenForm(true)
  }
  const handleClose = () => {
    setOpenForm(false)
    clearErrors()
  }
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="outlined"
        sx={{ color: "var(--primary-main)" }}
      >
        Sign in
      </Button>
      <Dialog
        open={openForm}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          autoComplete: 'off',
          noValidate: true,
          onSubmit: handleSubmit(onSubmit)
        }}
        sx={{
          "& .MuiDialog-paper	": {
            backgroundColor: 'var(--appBg)'
          },
          "& .MuiDialogContent-root": {
            p: '20px'
          },
          '& .MuiDialogActions-root': {
            p: '12px 20px'
          }
        }}
      >
        <Typography sx={{ color: 'var(--textApp)', p: 1.5 }} align="center">Sign In</Typography>
        <DialogContent>
          <ControlledField
            controllerProps={{
              control,
              name: "username",
              rules: signFormRules.username
            }}
            fieldProps={{
              label: "Username",
              required: true,
              error: !!errors.username,
              helperText: errors.username?.message,
              sx: {
                mb: 4,
                position: 'relative',
                "&>.MuiFormHelperText-root": {
                  m: 0,
                  position: 'absolute',
                  top: '97%'
                }
              }
            }}
          />
          <ControlledField
            controllerProps={{
              control,
              name: "password",
              rules: signFormRules.password
            }}
            fieldProps={{
              label: "Password",
              required: true,
              error: !!errors.password,
              helperText: errors.password?.message,
              sx: {
                position: 'relative',
                "&>.MuiFormHelperText-root": {
                  m: 0,
                  position: 'absolute',
                  top: '97%'
                }
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{
            textTransform: "capitalize",
          }}
          >
            Cancel
          </Button>
          <Button sx={{
            textTransform: "capitalize",
            borderRadius: '10px',
            py: {
              xs: "5px", lg: "10px"
            },
            minWidth: '120px'
          }}
            className="bg-gradient-to-r self-start from-primary-main to-primary-dark hover:brightness-110"

            type="submit"
            variant="contained"
          >
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SignInForm;

function checkauth(): any {
  throw new Error("Function not implemented.");
}
