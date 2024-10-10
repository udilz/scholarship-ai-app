import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

interface ICardProps {
    title : string,
    description : string,
    link : string,
    openDate: string,
    closeDate: string,
    country: string,
    city: string,
}

export const Card = ({title, description, link, openDate, closeDate, city, country} : ICardProps) => {
    return (
      <section key={title} className="rounded-md border-2 px-3 py-2 space-y-3">
        <header className="flex items-center justify-between">
          <h2 className="text-lg">{title}</h2>
          <Button className="rounded-full" iconOnly>
            <Bookmark size={18} />
          </Button>
        </header>
        <section className="space-y-3">
          <div className="flex gap-2">
          <p className="font-bold">{country}{', '}</p>
          <p >{city}</p>
          </div>
          <p className="text-pretty text-[15px] line-clamp-3">{description}</p>
          <a href={link} className="text-blue-600">
            {link}
          </a>
            <p className="space-x-2 text-sm font-normal italic text-slate-500">
              <span>{openDate}</span>
              {' - '}
              <span>{closeDate}</span>
            </p>
        </section>
      </section>
    );
  };
  