import React, {useEffect, useContext} from "react";

import Link from "next/link";
// import Font from "next/font/local";
import DataTable from "react-data-table-component";

// import JobContext from "@/contex/JobContext";
import JobContext from "@/contex/JobContext.js";

import {toast} from "react-toastify";

import {useRouter} from "next/router";

const MyJobs = ({jobs, access_token}) => {
  const {clearErrors, error, loading, deleted, deleteJob, setDeleted} =
    useContext(JobContext);

  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (deleted) {
      setDeleted(false);
      router.push(router.asPath);
    }
  }, [error, deleted]);

  const deleteJobHandler = (id) => {
    deleteJob(id, access_token);
  };

  const columns = [
    {
      name: "Job ID",
      sortable: true,
      selector: (row) => row.id,
    },
    {
      name: "Job name",
      sortable: true,
      selector: (row) => row.title,
    },
    {
      name: "Salary",
      sortable: true,
      selector: (row) => row.salary,
    },
    {
      name: "Action",
      sortable: true,
      selector: (row) => row.action,
    },
  ];

  const data = [];

  jobs &&
  jobs.forEach((job) => {
    data.push({
      id: job.id,
      title: job.title,
      salary: job.salary,
      action: (
        // <>
        //   <Link href={`/jobs/${job.id}`} className="btn btn-primary">
        //     <i aria-hidden className="fa fa-eye"></i>
        //   </Link>
        //   <Link href={`/employer/jobs/candidates/${job.id}`} className="btn btn-success my-2 mx-1">
        //     <i aria-hidden className="fa fa-users"></i>
        //   </Link>
        //   <Link href={`/employer/jobs/${job.id}`} className="btn btn-warning my-2 mx-1">
        //     <i aria-hidden className="fa fa-pencil"></i>
        //   </Link>
        //   <button
        //     className="btn btn-danger mx-1"
        //     onClick={() => deleteJobHandler(job.id)}
        //   >
        //     <i className="fa fa-trash"></i>
        //   </button>
        // </>

        <>
          <Link href={`/jobs/${job.id}`} className="btn btn-primary p-1 ">
            <i aria-hidden className="fa-eye" style={{fontSize: 14, color: '#FFFFFF'}}>Job</i>
          </Link>
          <Link href={`/employer/jobs/candidates/${job.id}`} className="btn btn-success mx-1 p-1">
            <i aria-hidden className="fas fa-users" style={{fontSize: 14, color: '#FFFFFF'}}>Candidates</i>
          </Link>
          <Link href={`/employer/jobs/${job.id}`} className="btn btn-warning mx-1 p-1">
            <i aria-hidden className="fa fa-pencil" style={{fontSize: 14, color: '#FFFFFF'}}>Edit</i>
          </Link>
          <button
            className="btn btn-danger mx-1 p-1"
            onClick={() => deleteJobHandler(job.id)}
          >
            <i className="fa-trash" style={{fontSize: 14, color: '#FFFFFF'}}>Delete</i>
          </button>
        </>
      ),
    });
  });

  return (
    <div className="row">
      <div className="col-2"></div>
      <div className="col-8 mt-5">
        <h4 className="my-5">My Jobs</h4>
        <DataTable columns={columns} data={data} pagination responsive/>
      </div>
      <div className="col-2"></div>
    </div>
  );
};

export default MyJobs;
