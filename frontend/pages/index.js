import localFont from "next/font/local";
import Layout from "@/components/layout/Layout";
import Home from "@/components/Home";
import axios from "axios";


// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export default function Index({data}) {
  // console.log(data)
  return (
    <Layout>

      <Home data={data}/>

    </Layout>
  );
}


export async function getServerSideProps({query}) {


  function extractSalary(query) {
    let min_salary = '';
    let max_salary = '';

    if (query.salary) {
      const salaries = Array.isArray(query.salary) ? query.salary : [query.salary];
      const salaryValues = salaries.flatMap((salary) => salary.split("-"));
      min_salary = Math.min(...salaryValues);
      max_salary = Math.max(...salaryValues);
    }

    return {min_salary, max_salary};
  }

  // search
  const keyword = query.keyword || ""
  const location = query.location || ""

  // pagination
  const page = query.page || 1

  // filtering
  const jobType = query.jobType || ""
  // const education = Array.isArray(query.education) ? query.education.join(',') : query.education;
  // console.log(education)
  const education = query.education || ""
  const experience = query.experience || ""
  const {min_salary, max_salary} = extractSalary(query);

  // entire URL query as string
  // const queryStr = `?keyword=${keyword}&location=${location}&page=${page}&jobType=${jobType}&education=${education}&experience=${experience}&min_salary=${min_salary}&max_salary=${max_salary}`
  // const res = await axios.get(`${process.env.API_URL}/api/jobs/${queryStr}`)

  const params = {
    keyword,
    location,
    page,
    jobType,
    education,
    experience,
    min_salary,
    max_salary
  };

  const res = await axios.get(`${process.env.API_URL}/api/jobs/`, {params});

  const data = res.data
  // console.log(data)

  return {props: {data}}
}











