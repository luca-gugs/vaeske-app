import React from "react";
type TabsProps = {
  activeTab: {
    name: string | undefined;
    id: number | undefined;
  };
  buyboxes: BuyBox[];

  setActiveTab: React.Dispatch<
    React.SetStateAction<{
      name: string | undefined;
      id: number | undefined;
    }>
  >;
};
export const Tabs = ({ activeTab, buyboxes, setActiveTab }: TabsProps) => {
  if (buyboxes.length > 0)
    return (
      <div className="mb-4 flex">
        {buyboxes.map((buybox, idx) => {
          return (
            <div
              key={idx}
              className={`cursor-pointer border-b-2 px-4 py-2 ${
                activeTab.name === buybox.name ? "border-blue-500" : ""
              }`}
              onClick={() => setActiveTab({ name: buybox.name, id: buybox.id })}
            >
              {buybox.name}
            </div>
          );
        })}
      </div>
    );
};
