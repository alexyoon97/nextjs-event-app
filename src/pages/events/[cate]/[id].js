import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";

const SingleEventPage = ({ data }) => {
  const inputEmail = useRef();
  const router = useRouter();
  const onSubmit = async (e) =>{
    e.preventDefault();

    const emailValue = inputEmail.current.value;
    const eventId = router?.query.id;

    try{
      //POST fetch request
      // body emailValue and eventId

      const response = await fetch('/api/email-registration',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: emailValue, eventId})
      })

      if(!response.ok) throw new Error(`error: ${response.status}`);
      
      const data = await response.json();
      console.log('POST' + data);
    }catch(e){
      console.log(e, 'Error');
    }

  }
  return (
    <div className="event_single_page">
      <Image width={300} height={300} alt={data.title} src={data.image} />
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <form onSubmit={onSubmit} className='email_registration'>
        Get Registered for this event
        <input ref={inputEmail} type="email" id="email" placeholder="your email"></input>
        <button type="submit">Submit</button>
      </form>
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
