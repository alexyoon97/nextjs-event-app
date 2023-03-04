import Link from "next/link";

const EventsPage = ({data}) => {
    return (
      <div>
        <h1>Events Page</h1>
        <div>
        { data.map(ev => 
        <Link key={ev.id} href={`/events/${ev.id}`} passHref={true}>
          <h2>{ev.title}</h2>
        </Link>
       )}
        </div>
      </div>
    );
  };
export default EventsPage;

export async function getServerSideProps() {
    const { events_categories } = await import("../../../data/data.json");
    return {
      props: {
        data: events_categories ,
      },
    };
  }
  