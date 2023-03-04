import Image from "next/image";

const SingleEventPage = ({ data }) => {
  return (
    <div>
      <Image width={300} height={300} alt={data.title} src={data.image} />
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
};

export default SingleEventPage;

export async function getStaticPaths() {
  const data = await import("../../../../data/data.json");
  const allEvents = data.allEvents;

  const allPaths = allEvents.map((path) => {
    return {
      params: {
        cate: path.city,
        id: path.id,
      },
    };
  });
  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log(context);
  const id = context.params.id;
  const { allEvents } = await import("../../../../data/data.json");
  const eventData = allEvents.find((ev) => ev.id === id);
  return {
    props: { data: eventData },
  };
}
