import Layout from "@/components/layout/Layout";
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import JobDetails from "@/components/job/JobDetails";

export default function JobDetailsPage({ job, applicants }) {

  return (
    <Layout>

      <JobDetails job={job} applicants={applicants} />

    </Layout>
  );
}

export async function getServerSideProps({params}) {

  const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}`)

  const job = res.data.job
  const applicants = res.data.applicants
  return { props: { job, applicants } }
}