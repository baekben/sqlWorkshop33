/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Routines({ userToken, setActivities, activities }) {
  const [routines, setRoutines] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function getRoutines() {
      const response = await fetch("http://localhost:3000/api/routines");
      const jsonData = await response.json();

      setRoutines(jsonData);
    }
    getRoutines();
  }, [activities]);

  async function sendActivities(routine) {
    try {
      setActivities(routine.activities);
      console.log("Updated activities:", activities);
      navigate("/activities");
      // setSuccess(result);
    } catch (error) {
      console.error(error);
      // setError(error);
    }
  }
  async function deleteRoutine(routine) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/routines/${routine.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const result = await response.json();
      console.log("Deleted", result);
      setSuccess(result);
    } catch (error) {
      setError(error);
    }
  }
  return (
    <>
      <div>
        <h1>Routines</h1>
        <div className="routinesContainer container mx-auto">
          <div className="statuses">
            {error && <h2>{error.message}</h2>}
            {success && <h2>{success.message}</h2>}
          </div>
          <div className="btnContainer flex flex-row space-x-2 justify-center pt-6">
            {userToken && (
              <div className="createBtn">
                <button>Create</button>
              </div>
            )}
          </div>
          <div className="routinesTable">
            {routines.length > 0 ? (
              <table className="table-auto border-separate border-spacing-0 p-5 ">
                <thead>
                  <tr>
                    <th className="border">Name</th>
                    <th className="border">Goal</th>
                    <th className="border">Creator Name</th>
                    <th className="deleteColumn px-2"></th>
                  </tr>
                </thead>
                <tbody className="text-left space-x-5">
                  {routines.map((routine, index) => {
                    return (
                      <>
                        <tr key={index + "-tableRow"}>
                          <td
                            className="border p-6"
                            key={index + "-name-routine-" + routine.id}
                          >
                            {routine.name}
                          </td>
                          <td
                            className="border p-4"
                            key={index + "-goal-routine-" + routine.id}
                          >
                            {routine.goal}
                          </td>
                          <td
                            className="border p-4"
                            key={index + "-creatorName-routine-" + routine.id}
                          >
                            {routine.creatorName}
                          </td>
                          <td className="px-2 justify-center">
                            {userToken && (
                              <>
                                <div className="detailBtn ">
                                  <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-2"
                                    onClick={() => {
                                      sendActivities(routine);
                                    }}
                                  >
                                    More Details
                                  </button>
                                </div>
                                <div>
                                  <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => {
                                      deleteRoutine(routine);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </>
                            )}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <h2>Loading...</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
