import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@material-ui/lab";
import React, { useState, useEffect } from "react";
import AdminAppBar from "../components/AdminAppBar";
import AdminToolbar from "../components/AdminToolbar";
import type { RootState } from "../../store";
// import Pagination from "../components/Pagination";
import NoteCard from "../components/NoteCard";
import AddNote, { EventFormValues } from "../components/AddNote";
import { Button } from "@material-ui/core";
import { Event } from "../types/event";
import { ADD_NOTE, DELETE_NOTE, UPDATE_NOTE } from "../../store/actions";
import usePagination from "../components/Pagination";

type Nullable<T> = T | null;

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const Notes = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.note.data);
  const [allNotes, setAlltNotes] = useState<any>(data);
  const [currentNotes, setCurrentNotes] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [pageSize, setPageSize] = useState(2);
  const [open, setOpen] = useState(false);
  const [eventUpdated, setEventUpdated] = useState<Event | undefined>(
    undefined
  );
  const _DATA = usePagination(allNotes, pageSize);

  useEffect(() => fetchNotes(), [allNotes]);

  const fetchNotes = (): void => {
    console.log(allNotes);
    const offset = (currentPage - 1) * pageSize;
    const currentNotes = allNotes.slice(offset, offset + pageSize);
    setCurrentNotes(currentNotes);
    setTotalPages(Math.ceil(allNotes.length / pageSize));
    // setAlltNotes(allNotes);
  };
  const totalNotes = allNotes.length;

  // if (totalNotes === 0) return null;

  const headerClass = [
    "text-dark py-2 pr-4 m-0",
    currentPage ? "border-gray border-right" : "",
  ]
    .join(" ")
    .trim();

  const count = Math.ceil(allNotes.length / pageSize);

  const handleChange = (e: any, p: any) => {
    setCurrentPage(p);
    _DATA.jump(p);
  };

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
    console.log(allNotes);
    const offset = (currentPage - 1) * pageSize;
    const currentNotes = allNotes.slice(offset, offset + pageSize);
    setCurrentNotes(currentNotes);
    setTotalPages(Math.ceil(allNotes.length / pageSize));
  };

  const handleAdd = (event?: Event) => {
    setEventUpdated(event);
    setOpen(true);
  };

  const onDelete = async (values: EventFormValues) => {
    console.log(values);
    await dispatch<any>({
      type: DELETE_NOTE,
      payload: { ...values },
    });
    const temp = allNotes.filter((element: any) => element.id !== values.id);
    setAlltNotes(temp);
    setEventUpdated(undefined);
    fetchNotes();
  };

  const onEdit = async (event: Event) => {
    console.log(event);
    setEventUpdated(event);
    setOpen(true);
    // console.log(values);
    // await dispatch<any>({
    //   type: UPDATE_NOTE,
    //   payload: { ...values },
    // });
    // // setAlltNotes([...allNotes, values]);
    // setEventUpdated(undefined);
    // fetchNotes();
  };

  const onSubmit = async (values: EventFormValues) => {
    console.log(values);
    if (values.id === "") {
      const tempVal = { ...values };
      let myuuid = uuid();
      let mydate = new Date();
      console.log("handleSubmit", values, myuuid);
      tempVal.id = values.id === "" ? myuuid : values.id;
      tempVal.created_at = mydate;
      console.log(values);
      console.log(tempVal);
      await dispatch<any>({
        type: ADD_NOTE,
        payload: { ...tempVal },
      });
      setAlltNotes([...allNotes, tempVal]);
    } else {
      await dispatch<any>({
        type: UPDATE_NOTE,
        payload: { ...values },
      });
      const indexU = allNotes.findIndex((item: any) => item.id === values.id);
      const updatedItem = { ...values };
      setAlltNotes([
        ...allNotes.slice(0, indexU),
        updatedItem,
        ...allNotes.slice(indexU + 1),
      ]);
    }

    setEventUpdated(undefined);
    setOpen(false);
    // fetchNotes();
  };

  const onClose = (ev: any) => {
    setEventUpdated(undefined);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar title="Notes" />
      </AdminAppBar>
      <Grid container spacing={2} sx={{ mt: 3 }} flexDirection="column">
        <div className="container mb-5">
          <div className="row d-flex flex-row py-5">
            <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
              <div
                className="d-flex flex-row align-items-center"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h2 className={headerClass}>
                    <strong className="text-secondary">{totalNotes}</strong>
                    Notes
                  </h2>
                  {currentPage && (
                    <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                      Page{" "}
                      <span className="font-weight-bold">{currentPage}</span> /{" "}
                      <span className="font-weight-bold">{totalPages}</span>
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button onClick={() => handleAdd()}>Add</Button>
                  <div className="d-flex flex-row py-4 align-items-center">
                    <Pagination
                      count={count}
                      size="large"
                      page={currentPage}
                      variant="outlined"
                      shape="rounded"
                      color="primary"
                      onChange={handleChange}
                    />
                    <p className="currentPageLabel">
                      {/* Current page in parent: {currentPage} */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Grid container spacing={2} sx={{ mt: 3 }}>
              {_DATA.currentData().map((note: any) => (
                <Grid key={note.id} item xs={12} sm={6}>
                  <NoteCard note={note} onDelete={onDelete} onEdit={onEdit} />
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </Grid>
      <AddNote
        onSubmit={onSubmit}
        onClose={onClose}
        open={open}
        update={false}
        read={false}
        event={eventUpdated}
      />
    </React.Fragment>
  );
};

export default Notes;
