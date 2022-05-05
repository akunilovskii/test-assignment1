import React, { useCallback, useEffect, useState } from "react";
import Student from "../components/Student";
import InputField from "../components/InputField";
import { URL } from "../utils/config";
import { AJAX, calcGradesAverage } from "../utils/helper";
import { ReactComponent as MinusIcon } from "../assets/minus-icon.svg";

function HomePage() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [arrayToRender, setArrayToRender] = useState([]);
  const [searchInputFields, setSearchInputFields] = useState({
    name: "",
    tags: "",
  });
  useEffect(() => {
    async function getStudents() {
      const { students } = await AJAX(URL);
      const newStudents = students.map((std) => ({
        name: [std.firstName.toLowerCase(), std.lastName.toLowerCase()],
        city: std.city,
        skill: std.skill,
        grades: std.grades,
        avgrades: calcGradesAverage(std.grades),
        pic: std.pic,
        tags: [],
        company: std.company,
        email: std.email,
        id: std.id,
      }));
      setStudents(newStudents);
      setIsLoading(false);
    }
    getStudents();
  }, []);

  const newFilterStudentsArrayToRender = useCallback(() => {
    return students.filter((std) => {
      let hasAnySearchField = false;
      for (let [key, value] of Object.entries(searchInputFields)) {
        if (!value.length) {
          continue;
        }
        hasAnySearchField = true;
        if (std[key].join("").includes(value)) {
          return true;
        }
      }
      return !hasAnySearchField;
    });
  }, [searchInputFields, students]);

  function searchInputHanlder(searchType, value) {
    const data = { ...searchInputFields };
    data[searchType] = value;
    setSearchInputFields(data);
  }

  const addTagToStudent = useCallback(
    (e, studentId, tagText) => {
      e.preventDefault();
      const index = students.findIndex((std) => std.id === studentId);
      const newStudent = {
        ...students[index],
        ...students[index].tags.push(tagText),
      };
      const newStudents = [
        ...students.slice(0, index),
        newStudent,
        ...students.slice(index + 1),
      ];
      setStudents(newStudents);
    },
    [students]
  );

  useEffect(() => {
    const searchInputId = setTimeout(() => {
      setArrayToRender(
        newFilterStudentsArrayToRender().map((std) => {
          return (
            <Student student={std} addTag={addTagToStudent} key={`${std.id}`} />
          );
        })
      );
    }, 500);
    return () => {
      clearTimeout(searchInputId);
    };
  }, [addTagToStudent, setArrayToRender, newFilterStudentsArrayToRender]);

  if (isLoading) {
    return (
      <div className="spinner">
        <h1>
          Wait...
          <br />
          <span>Students list is loading</span>
        </h1>
        <MinusIcon className="spinner-icon icon" />
      </div>
    );
  }

  return (
    <>
      <div className="input-container">
        <InputField
          fieldType="search"
          searchType="name"
          placeHolder="Search by name"
          onSearchInputChange={searchInputHanlder}
        />
        <InputField
          fieldType="search"
          searchType="tags"
          placeHolder="Search by tag"
          onSearchInputChange={searchInputHanlder}
        />
      </div>
      <div className="students-container">
        <ul className="students-list">{arrayToRender}</ul>
      </div>
    </>
  );
}

export default HomePage;
