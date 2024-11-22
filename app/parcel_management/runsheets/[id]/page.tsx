import React from "react";

const RunsheetPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  return <div>{id}e</div>;
};

export default RunsheetPage;
