import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";

interface SelectToolbarProps {
  onCancel: () => void;
  onDelete: (userIds: string[]) => void;
  processing: boolean;
  selected: string[];
}

const SelectToolbar = ({
  onCancel,
  onDelete,
  processing,
  selected,
}: SelectToolbarProps) => {
  const numSelected = selected.length;

  return (
    <Toolbar sx={{ ml: 1, px: { xs: 3, sm: 6 } }}>
      <Fab color="secondary" onClick={onCancel} variant="extended">
        <CloseIcon sx={{ mr: 1 }} />
        {numSelected} Selected
      </Fab>
      <Box sx={{ flexGrow: 1 }} />

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <Fab
            color="secondary"
            disabled={processing}
            onClick={() => onDelete(selected)}
          >
            <DeleteIcon />
          </Fab>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default SelectToolbar;
