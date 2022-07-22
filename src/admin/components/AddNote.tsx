import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Event } from "../types/event";

type EventDialogProps = {
  onSubmit: (event: Event) => void;
  onClose: (event: any) => void;
  open: boolean;
  update: boolean;
  read: boolean;
  event?: Event;
};

export type EventFormValues = {
  id: string;
  title: string;
  description?: string;
  created_at: Date;
};

const ZERO_DATE = new Date(0);
const AddNote = ({
  onSubmit,
  onClose,
  open,
  update,
  read,
  event,
}: EventDialogProps) => {
  const editMode = Boolean(event && event.id);

  const handleSubmit = (values: EventFormValues) => {
    onSubmit(values);
    // const newEvent = convertFormValues(values);
    // if (event && event.id) {
    //   onUpdate({ ...newEvent, id: event.id } as Event);
    // } else {
    //   onAdd(newEvent);
    // }
  };
  console.log(event);

  const formik = useFormik({
    initialValues: {
      id: event ? event.id : "",
      title: event ? event.title : "",
      description: event ? event.description : undefined,
      created_at: event ? event.created_at : ZERO_DATE,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      description: Yup.string().max(100, "Must be 100 characters or less"),
    }),
    onSubmit: handleSubmit,
  });

  console.log(formik.values.title);
  return (
    <Dialog
      onBackdropClick={undefined}
      open={open}
      onClose={onClose}
      aria-labelledby="event-dialog-title"
    >
      <form onSubmit={formik.handleSubmit} noValidate>
        <DialogTitle id="event-dialog-title">
          {editMode ? "Update Note" : "Add Note"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="title"
            name="title"
            autoFocus
            // disabled={processing}
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="description"
            name="description"
            multiline
            // disabled={processing}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </DialogContent>
        <DialogActions>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={(ev) => onClose(ev)}>Cancel</Button>
          <LoadingButton type="submit" variant="contained">
            Add
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddNote;
