import React, {useState} from 'react';
import {useRouter} from 'next/router';

const Filters = () => {


  const router = useRouter();
  let queryParams;

  if (typeof window !== "undefined") {
    queryParams = new URLSearchParams(window.location.search);
  }

  //  // appends selected checkboxes in the URL
  // const handleClick = (checkbox) => {
  //   if (typeof window !== "undefined") {
  //     const checkboxes = document.getElementById(checkbox.id);
  //     if (checkboxes.checked) {
  //       queryParams.append(checkbox.name, checkbox.value);
  //     } else {
  //       // Check if there are other checked values with the same name
  //       const otherCheckedValues = Array.from(document.querySelectorAll(`input[name="${checkbox.name}"]:checked`)).map((input) => input.value);
  //       if (otherCheckedValues.length > 0) {
  //         // If there are other checked values, only delete the unchecked value
  //         queryParams.set(checkbox.name, otherCheckedValues.join(','));
  //       } else {
  //         // If there are no other checked values, delete the name entirely
  //         queryParams.delete(checkbox.name);
  //       }
  //     }
  //     router.push({
  //       search: queryParams.toString(),
  //     });
  //   }
  // };

  // // does not append selected checkboxes in the URL
  // const handleClick = (checkbox) => {
  //   if (typeof window !== "undefined") {
  //     const checkboxes = document.querySelectorAll(`input[name="${checkbox.name}"]`);
  //     checkboxes.forEach((cb) => {
  //       if (cb !== checkbox) {
  //         cb.checked = false;
  //       }
  //     });
  //     queryParams.delete(checkbox.name);
  //     checkboxes.forEach((cb) => {
  //       if (cb.checked) {
  //         queryParams.append(checkbox.name, cb.value);
  //       }
  //     });
  //     router.push({
  //       search: queryParams.toString(),
  //     });
  //   }
  // };


  const handleClick = (checkbox) => {
    if (typeof window !== "undefined") {
      const checkboxes = document.querySelectorAll(`input[name="${checkbox.name}"]`);
      checkboxes.forEach((cb) => {
        if (cb !== checkbox) {
          cb.checked = false;
        }
      });
      queryParams.delete(checkbox.name);
      queryParams.delete('page');
      checkboxes.forEach((cb) => {
        if (cb.checked) {
          queryParams.append(checkbox.name, cb.value);
        }
      });
      router.push({
        search: queryParams.toString(),
      });
    }
  };

  // // does not append selected checkboxes in the URL
  // const handleClick = (checkbox) => {
  //   if (typeof window !== "undefined") {
  //     const checkboxes = document.querySelectorAll(`input[name="${checkbox.name}"]`);
  //     checkboxes.forEach((cb) => {
  //       if (cb !== checkbox) {
  //         cb.checked = false;
  //       }
  //     });
  //     const checkedValues = Array.from(checkboxes).filter((cb) => cb.checked).map((cb) => cb.value);
  //     queryParams.delete(checkbox.name);
  //     checkedValues.forEach((value) => {
  //       queryParams.append(checkbox.name, value);
  //     });
  //     router.push({
  //       search: queryParams.toString(),
  //     });
  //   }
  // };


  // makes the selected checkboxes persistent in the URL
  function checkHandler(checkBoxType, checkBoxValue) {
    if (typeof window !== "undefined") {
      const value = queryParams.get(checkBoxType);
      return checkBoxValue === value;
    }
  }

  return (
    <div className="sidebar mt-5">
      <h3>Filters</h3>

      <hr/>
      <h5 className="filter-heading mb-3">Job Type</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="jobType"
          id="check1"
          value="Permanent"
          defaultChecked={checkHandler('jobType', 'Permanent')}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check1">
          Permanent
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="jobType"
          id="check2"
          value="Temporary"
          defaultChecked={checkHandler('jobType', 'Temporary')}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check2">
          Temporary
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="jobType"
          id="check3"
          value="Internship"
          defaultChecked={checkHandler('jobType', 'Internship')}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check3">
          Internship
        </label>
      </div>

      <hr/>
      <h5 className="mb-3">Education</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="education"
          id="check4"
          value="Bachelors"
          defaultChecked={checkHandler('education', 'Bachelors')}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check4">
          Bachelors
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="education"
          id="check5"
          value="Masters"
          defaultChecked={checkHandler('education', 'Masters')}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check5">
          Masters
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="education"
          id="check6"
          value="PHD"
          defaultChecked={checkHandler('education', 'PhD')}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check6">
          Phd
        </label>
      </div>

      <hr/>

      <h5 className="mb-3">Experience</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check7"
          value="No Experience"
          defaultChecked={checkHandler('experience', 'No Experience')}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check7">
          No Experience
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check8"
          value="1 Year"
          defaultChecked={checkHandler('experience', '1 Years')}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check8">
          1 Years
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check9"
          value="2 Years"
          defaultChecked={checkHandler('experience', '2 Years')}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check9">
          2 Years
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check10"
          value="3 Years or above"
          defaultChecked={checkHandler('experience', '3 Years above')}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check10">
          3 Year+
        </label>
      </div>

      <hr/>
      <h5 className="mb-3">Salary Range</h5>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="salary1"
          value="1-50000"
          defaultChecked={checkHandler('salary', '1-50000')}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check11">
          $1 - $50000
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="salary2"
          value="50000-100000"
          defaultChecked={checkHandler('salary', '50000-100000')}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check12">
          $50000 - $100,000
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="salary3"
          value="100000-200000"
          defaultChecked={checkHandler('salary', '100000-200000')}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check13">
          $100,000 - $200,000
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="salary4"
          value="200000-300000"
          defaultChecked={checkHandler('salary', '200000-300000')}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="defaultCheck2">
          $200,000 - $300,000
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="salary5"
          value="300000-400000"
          defaultChecked={checkHandler('salary', '300000-400000')}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="defaultCheck2">
          $300,000 - $400,000
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="salary6"
          value="500000-1000000"
          defaultChecked={checkHandler('salary', '400000-1000000')}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check14">
          $400,000 - $1,000,000
        </label>
      </div>

      <hr/>
    </div>
  );
};

export default Filters;















