import { useEffect, useState } from "react";

export default function Activities() {
  const [activites, setActivites] = useState([]);
  useEffect(() => {
    async function getActivities() {
      const response = await fetch("http://localhost:3000/api/activities");
      const jsonData = await response.json();
      setActivites(jsonData);
    }
    getActivities();
  }, []);
  return (
    <>
      <div>
        <h1>Activites</h1>
        <div className="activitesContainer container mx-auto">
          <div className="btnContainer flex flex-row space-x-2 items-center">
            <div className="createBtn">
              <button>Create</button>
            </div>
            <div className="deleteBtn">
              <button>Delete</button>
            </div>
          </div>
          <div className="activitesTable">
            <table className="table-auto border-separate border-spacing-0 p-5 ">
              <thead>
                <tr>
                  <th className="border">Name</th>
                  <th className="border">Description</th>
                </tr>
              </thead>
              <tbody className="text-left space-x-5">
                {activites.map((activity, index) => {
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
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
