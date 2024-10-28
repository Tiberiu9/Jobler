import Layout from "@/components/layout/Layout";
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import JobDetails from "@/components/job/JobDetails";
import NotFound from "@/components/layout/NotFound";

export default function JobDetailsPage({job, applicants, access_token, error}) {
  if (error?.includes("No Job matches the given query.")) return <NotFound />

  return (
    <Layout title={job.title}>

      <JobDetails job={job} applicants={applicants} access_token={access_token}/>

    </Layout>
  );
}

export async function getServerSideProps({req, params}) {

  try {
    const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}`)
    const job = res.data.job
    const applicants = res.data.applicants
    const access_token = req.cookies.access  || ''
    return {props: {job, applicants, access_token}}
  } catch (error) {
    return {props: {
      error: error.response.data.detail
      }}
  }
}