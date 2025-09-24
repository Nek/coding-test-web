import { CompanyEvent } from '../types/company';

interface LatestEventProps {
  event: CompanyEvent;
}

export const LatestEvent = ({ event }: LatestEventProps) => {
  return (
    <div className="latest-event">
      <h4>Latest Report</h4>
      <p>{event.eventTitle} - {event.fiscalYear}</p>
      <time>{new Date(event.eventDate).toLocaleDateString()}</time>
    </div>
  );
};