import { useEffect, useState } from "react";
export default function Routines() {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    async function getRoutines() {
      const response = await fetch("http://localhost:3000/api/routines");
      const jsonData = await response.json();
      setRoutines(jsonData);
    }
    getRoutines();
  }, []);

  return (
    <>
      <div>
        <h1>Routines</h1>
        <div className="routinesContainer container mx-auto">
          <div className="btnContainer flex flex-row space-x-2 items-center">
            <div className="createBtn">
              <button>Create</button>
            </div>
            <div className="deleteBtn">
              <button>Delete</button>
            </div>
          </div>
          <div className="routinesTable">
            <table className="table-auto border-separate border-spacing-0 p-5 ">
              <thead>
                <tr>
                  <th className="border">Name</th>
                  <th className="border">Goal</th>
                  <th className="border">Creator Name</th>
                </tr>
              </thead>
              <tbody className="text-left space-x-5">
                {routines.length > 0 ? (
                  routines.map((routine, index) => {
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
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <h2>Loading...</h2>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
