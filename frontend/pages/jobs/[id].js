import Layout from "@/components/layout/Layout";
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import JobDetails from "@/components/job/JobDetails";
import NotFound from "@/components/layout/NotFound";

export default function JobDetailsPage({job, applicants, error}) {
  if (error?.includes("No Job matches the given query.")) return <NotFound />

  return (
    <Layout title={job.title}>

      <JobDetails job={job} applicants={applicants}/>

    </Layout>
  );
}

export async function getServerSideProps({params}) {

  try {
    const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}`)
    const job = res.data.job
    const applicants = res.data.applicants
    return {props: {job, applicants}}
  } catch (error) {
    console.log(error.response.data)
    return {props: {
      error: error.response.data.detail
      }}
  }


}