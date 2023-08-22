/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Activities({ userToken, activities, setActivities }) {
  const navigate = useNavigate();
  const [newExercise, setNewExercise] = useState();
  const [newDescription, setNewDescription] = useState();
  const [showHtml, setShowHtml] = useState(false);
  // useEffect(() => {
  //   async function getActivities() {
  //     const response = await fetch("http://localhost:3000/api/activities");
  //     const jsonData = await response.json();
  //     setActivities(jsonData);
  //   }
  //   getActivities();
  // }, []);
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/activities", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          name: newExercise,
          description: newDescription,
        }),
      });
      const result = await response.json();
      setActivities(result);
      setShowHtml(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function createActivity() {
    setShowHtml(!showHtml);
  }

  return (
    <>
      <div>
        <h1>Activities</h1>
        <div className="activitiesContainer container mx-auto">
          {userToken ? (
            <>
              <div className="btnContainer flex flex-row space-x-2 justify-center pt-6">
                {userToken && (
                  <div className="createBtn">
                    <button onClick={createActivity}>Create</button>
                  </div>
                )}
              </div>
              <div className="formContainer">
                {showHtml && (
                  <>
                    <form onSubmit={handleSubmit}>
                      <label>
                        Exercise name:
                        <input
                          type="text"
                          onChange={(e) => {
                            setNewExercise(e.target.value);
                          }}
                        />
                      </label>
                      <label>
                        Description:
                        <input
                          type="text"
                          onChange={(e) => {
                            setNewDescription(e.target.value);
                          }}
                        />
                      </label>
                      <button>Submit</button>
                    </form>
                  </>
                )}
              </div>
              <div className="activitiesTable">
                {activities.length > 0 ? (
                  <>
                    {/* <h2>{activities.routineName}</h2> */}
                    <table className="table-auto border-separate border-spacing-0 p-5 ">
                      <thead>
                        <tr>
                          <th className="border">Name</th>
                          <th className="border">Description</th>
                          <th className="deleteColumn px-2"></th>
                        </tr>
                      </thead>
                      <tbody className="text-left space-x-5">
                        {activities.map((activity, index) => {
                          return (
                            <>
                              <tr key={index + "-tableRow"}>
                                <td
                                  className="border p-6"
                                  key={index + "-name-activity-" + activity.id}
                                >
                                  {activity.name}
                                </td>
                                <td
                                  className="border p-4"
                                  key={index + "-desc-activity-" + activity.id}
                                >
                                  {activity.description}
                                </td>
                                <td className="px-2">
                                  {/* {userToken && (
                              <div
                                className="deleteBtn"
                                onClick={(e) => {
                                  deleteItem(e);
                                }}
                              >
                                <button>Delete</button>
                              </div>
                            )} */}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <h2>Loading...</h2>
                )}
              </div>
            </>
          ) : (
            <>
              <div>
                <h2>Error: This page does not exist at the moment</h2>
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Go Back
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
