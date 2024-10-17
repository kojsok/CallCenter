import { FC } from 'react';
import {
  Button,
  Typography,
  MenuItem,
  Box,
  IconButton,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import StyledScrollBar from '../common/StyledScrollbar/StyledScrollbar';
import ControlledField from '../common/ControlledField/ControlledField';
//validation rules
import { clientFormRules } from './clientFormValidationRules';
import { useClientForm } from '@/hooks/useClientForm';
interface ClientsFormProps {
  formType: 'edit-form' | 'add-form'
}

const ClientsForm: FC<ClientsFormProps> = ({ formType }) => {
  const {
    fieldsArrayReg,
    handleSubmit,
    control,
    formErrors: errors,
    responseMessage,
    onSubmit,
    isEditForm,
    isSubmitting
  } = useClientForm(formType)
  const { fields, append, remove } = fieldsArrayReg


  return (
    <Box className="flex flex-col overflow-hidden h-full md:rounded-2xl md:border-2 md:border-primary-light md:p-4 lg:rounded-none lg:border-transparent lg:p-0">
      <StyledScrollBar>
        <Typography variant="h4" gutterBottom sx={{ mb: '30px', fontSize: "1.5rem", color: "var(--textApp)" }}>
          {isEditForm ? "Edit Client Data" : 'Add New Client'}
        </Typography>
        {/* Используем handleSubmit из react-hook-form для обработки отправки формы */}
        <form className='clientForm flex flex-col gap-6' noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          {/* Используем обертку ControlledField*/}
          <Box className="flex gap-6 fieldGroup">
            <ControlledField
              controllerProps={{
                control,
                name: 'firstName',
                rules: clientFormRules.firstName //правило из объекта 
              }}
              fieldProps={{
                label: 'First Name',
                required: true,
                error: !!errors.firstName,// Показываем ошибку, если есть
                helperText: errors.firstName?.message // Текст ошибки
              }}
            />
            <ControlledField
              controllerProps={{
                control,
                name: "lastName",
                rules: clientFormRules.lastName
              }}
              fieldProps={{
                label: "Last Name",
                required: true,
                error: !!errors.lastName,
                helperText: errors.lastName?.message,
              }}
            />
          </Box>
          <Box className="flex gap-6 fieldGroup">
            <ControlledField
              controllerProps={{
                control,
                name: "contacts.phone",
                rules: clientFormRules['contacts.phone']
              }}
              fieldProps={{
                label: "Phone",
                required: true,
                error: !!errors.contacts?.phone,
                type: 'tel',
                helperText: errors.contacts?.phone?.message,
              }}
            />
            <ControlledField
              controllerProps={{
                control,
                name: "contacts.email",
                rules: clientFormRules["contacts.email"]
              }}
              fieldProps={{
                label: "Email",
                required: true,
                type: 'email',
                error: !!errors.contacts?.email,
                helperText: errors.contacts?.email?.message,
              }}
            />
          </Box>
          <Box className="flex gap-6 fieldGroup">
            <ControlledField
              controllerProps={{
                control,
                name: "age",
                rules: clientFormRules.age
              }}
              fieldProps={{
                label: "Возраст",
                required: true,
                error: !!errors.age,
                type: 'number',
                helperText: errors.age?.message,
              }}
            />
            <ControlledField
              controllerProps={{
                control,
                name: "gender",
                rules: clientFormRules.gender
              }}
              fieldProps={{
                label: "Gender",
                error: !!errors.gender,
                select: true,
                helperText: errors.gender?.message,
                children: [<MenuItem key="female" value="female">Female</MenuItem>,
                <MenuItem key="male" value="male">Male</MenuItem>]

              }}
            />
            <ControlledField
              controllerProps={{
                control,
                name: "status",
                rules: clientFormRules.status
              }}
              fieldProps={{
                label: "Status",
                error: !!errors.status,
                helperText: errors.status?.message,
                select: true,
                children: [
                  <MenuItem key="VIP" value="VIP">VIP</MenuItem>,
                  <MenuItem key="active" value="active">Active</MenuItem>,
                  <MenuItem key="new" value="new">New</MenuItem>,
                  <MenuItem key="problematic" value="problematic">Particular</MenuItem>,
                  <MenuItem key="inactive" value="inactive">Inactive</MenuItem>,
                ]
              }}
            />

          </Box>
          <Box className="flex gap-6 fieldsGroup">
            <ControlledField
              controllerProps={{
                control,
                name: "image",
                rules: clientFormRules.image
              }}
              fieldProps={{
                required: true,
                label: "Avatar Url",
                type: 'url',
                error: !!errors.image,
                helperText: errors.image?.message,
              }}
            />

            <ControlledField
              controllerProps={{
                control,
                name: "lastInteractionDate",
                rules: clientFormRules.lastInteractionDate
              }}
              fieldProps={{
                label: "Last interaction",
                type: 'date',
                sx: {
                  width: "45%"
                }
              }}
            />
          </Box>

          {/* notes fields, dynamic */}
          {fields.map((field, index) => (
            <Box key={field.id} className="flex gap-2 items-center relative">
              <ControlledField
                controllerProps={{
                  control,
                  name: `notes.${index}`,
                  rules: clientFormRules.notes
                }}
                fieldProps={{
                  label: `Note ${index + 1}`,
                  multiline: true,
                  fullWidth: true,
                  error: !!errors.notes?.[index],
                  helperText: errors.notes?.[index]?.message,
                }}
              />
              <IconButton onClick={() => remove(index)} sx={{ mt: '12px', color: 'var(--error)' }}>
                <DeleteOutlineIcon />
              </IconButton>
            </Box>
          ))}

          {/* Add note button */}
          <Button
            onClick={() => append('')}
            sx={{ textTransform: 'capitalize', textDecoration: 'underline', textUnderlineOffset: '5px', color: 'var(--primary-main)', p: 0 }}
          >
            Добавить заметку
          </Button>

          {/* Submit button */}
          <Button
            sx={{
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
            disabled={isSubmitting} // Обновлено свойство для отслеживания состояния мутации
          >
            {isEditForm ? (isSubmitting ? 'Saving...' : 'Save') : (isSubmitting ? 'Sending...' : 'Send')}
          </Button>
        </form>

        {/* Response result notification */}
        {responseMessage && (
          <Typography
            variant="body1"
            color={
              responseMessage.includes('успешно')
                ? 'success.main'
                : 'error.main'
            }
            sx={{ mt: 2 }}
          >
            {responseMessage}
          </Typography>
        )}

        {/* вот эту часть можно показывать во всплывающих уведомлениях
        <Box mt={2}>
          {mutation.status === 'pending' && <Typography color="info.main">Loading...</Typography>}
          {mutation.isError && (
            <Typography color="error.main">
              Error: {mutation.error instanceof Error ? mutation.error.message : 'Unknown error'}
            </Typography>
          )}
          {mutation.isSuccess && <Typography color="success.main">Form submitted successfully!</Typography>}
        </Box> */}
      </StyledScrollBar>
    </Box>
  );
};

export default ClientsForm;