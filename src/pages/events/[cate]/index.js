import Image from "next/image";
import Link from "next/link";

const EventListPage = ({ data, pageName }) => {
  return (
    <div>
      <h1>Events in {pageName}</h1>
      {data.map((ev) => (
        <Link key={ev.id} href={`/events/${ev.city}/${ev.id}`} passHref={true}>
          <Image width={300} height={300} alt={ev.title} src={ev.image} />
          <h2> {ev.title}</h2>
        </Link>
      ))}
    </div>
  );
};

export default EventListPage;

export async function getStaticPaths() {
  const { events_categories } = await import("../../../../data/data.json");
  const allPaths = events_categories.map((ev) => {
    return {
      params: {
        cate: ev.id.toString(),
      },
    };
  });
  console.log(allPaths);
  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log(context);
  const id = context?.params.cate;
  const { allEvents } = await import("../../../../data/data.json");

  const data = allEvents.filter((ev) => ev.city === id);
  console.log(data);
  return { props: { data, pageName: id } };
}
