// import { NextResponse } from "next/server";
//
// const allowedParams = [
//   "keyword",
//   "location",
//   "page",
//   "education",
//   "experience",
//   "salary",
//   "jobType",
// ];
//
// export async function middleware(request) {
//   // const country = req.geo.country
//
//   const url = request.nextUrl;
//   let changed = false;
//
//   url.searchParams.forEach((param, key) => {
//     if (!allowedParams.includes(key)) {
//       url.searchParams.delete(key);
//       changed = true;
//     }
//   });
//
//   if (changed) {
//     return NextResponse.redirect(url);
//   }
// }



import { NextResponse } from "next/server";

const allowedParams = [
  "keyword",
  "location",
  "page",
  "education",
  "experience",
  "salary",
  "jobType",
];

const allowedValues = {
  jobType: ["Permanent", "Temporary", "Internship"],
  education: ["Bachelors", "Masters", "Phd"],
  experience: ["No+Experience", "1+Year", "2+Years", "3+Years+or+above"],
  salary: ["1-50000", "50000-100000", "100000-200000", "200000-300000", "300000-400000", "400000-1000000"],
};

export async function middleware(request) {
  const url = request.nextUrl;
  let changed = false;

  url.searchParams.forEach((param, key) => {
    if (!allowedParams.includes(key)) {
      url.searchParams.delete(key);
      changed = true;
    } else if (allowedValues[key] && !allowedValues[key].includes(param)) {
      url.searchParams.delete(key);
      changed = true;
    }
  });

  if (changed) {
    return NextResponse.redirect(url);
  }
}
