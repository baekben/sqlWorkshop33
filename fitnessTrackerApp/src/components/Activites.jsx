/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function Activities({ userToken }) {
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
          <div className="btnContainer flex flex-row space-x-2 justify-center pt-6">
            {userToken && (
              <div className="createBtn">
                <button>Create</button>
              </div>
            )}
          </div>
          <div className="activitesTable">
            {activites.length > 0 ? (
              <table className="table-auto border-separate border-spacing-0 p-5 ">
                <thead>
                  <tr>
                    <th className="border">Name</th>
                    <th className="border">Description</th>
                    <th className="deleteColumn px-2"></th>
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
            ) : (
              <h2>Loading...</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
