import React, { useState } from "react";
import InputField from "./InputField";
import { ReactComponent as PlusIcon } from "../assets/plus-icon.svg";
import { ReactComponent as MinusIcon } from "../assets/minus-icon.svg";

function Student({ student, addTag }) {
  const [tagFieldText, setTagFieldText] = useState("");
  const [areGradesVisible, setAreGradesVisible] = useState(false);

  function onSubmitHandler(e) {
    addTag(e, student.id, tagFieldText);
    setTagFieldText("");
  }

  function onInputHandler(value) {
    setTagFieldText(value);
  }

  function onBlurHandler() {
    setTagFieldText("");
  }

  function clickHandler() {
    setAreGradesVisible((prevAreGradesVisible) => !prevAreGradesVisible);
  }

  return (
    <li className="student">
      <div className="image-wrapper">
        <img className="student__image" src={`${student.pic}`} alt="Student" />
      </div>

      <div className="details-wrapper">
        <div className="student__name">
          <h1>{`${student.name.join(" ")}`}</h1>
          <div className="button-container">
            <button className="icon-wrapper" onClick={clickHandler}>
              {!areGradesVisible ? (
                <PlusIcon className="plus-sign icon" />
              ) : (
                <MinusIcon className="minus-sign icon" />
              )}
            </button>
          </div>
        </div>
        <div className="details-secondary">
          <div className="student__email">
            <p>{`Email: ${student.email}`}</p>
          </div>
          <div className="student__company">
            <p>{`Company: ${student.company}`}</p>
          </div>
          <div className="student__company">
            <p>{`Skill: ${student.skill}`}</p>
          </div>
          <div className="student__grades">
            <p>{`Average: ${student.avgrades}%`}</p>
          </div>

          <div
            className={`grades-container ${areGradesVisible ? "" : "disabled"}`}
            data-testid={student.id}
          >
            {student.grades.map((grade, i) => {
              return (
                <div className="grade__item" key={`${Math.random()}`}>
                  <span>{`Test${i + 1}:`}</span>
                  <span>{`${grade}%`}</span>
                </div>
              );
            })}
          </div>
          <form className="student__tag-container" onSubmit={onSubmitHandler}>
            <div className="tags-wrapper">
              {!!student.tags.length &&
                student.tags.map((tag) => {
                  return (
                    <div className="tag__item" key={`${Math.random()}`}>
                      <span>{`${tag}`}</span>
                    </div>
                  );
                })}
            </div>
            <InputField
              fieldType="tag"
              placeHolder="Add a tag"
              onTagInputChange={onInputHandler}
              onBlur={onBlurHandler}
              value={tagFieldText}
            />
          </form>
        </div>
      </div>
    </li>
  );
}

export default Student;
