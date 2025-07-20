import Card from "./Card";

const Cards = () => {
  return (
    <div className="w-full bg-[#1f2c38] py-20 px-4">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-6">
        <Card width={"md:basis-1/3 w-full"} start={false} para={true} />
        <Card width={"md:basis-2/3 w-full"} start={true} para={false} hover={true} />
      </div>
    </div>
  );
};

export default Cards;
