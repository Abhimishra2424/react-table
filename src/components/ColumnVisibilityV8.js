import React from "react";
import { Button } from "semantic-ui-react";
import {
  Checkbox,
  DialogActions,
  DialogContent,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

export default function ColumnVisibilityV8({
  tableInstance,
  handleClose,
  open,
}) {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Column Visibility</DialogTitle>
      <DialogContent>
        <label>
          <input
            {...{
              type: "checkbox",
              checked: tableInstance.getIsAllColumnsVisible(),
              onChange: tableInstance.getToggleAllColumnsVisibilityHandler(),
            }}
          />{" "}
          Toggle All
        </label>
        {tableInstance.getAllLeafColumns().map((column) => (
          <FormGroup key={column.id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={column.getIsVisible()}
                  onChange={column.getToggleVisibilityHandler()}
                />
              }
              label={column.id}
            />
          </FormGroup>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
