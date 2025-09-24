import { CompanyEvent } from '../types/company';

interface LatestEventProps {
  event: CompanyEvent;
}

export const LatestEvent = ({ event }: LatestEventProps) => {
  const eventDate = new Date(event.eventDate);
  const formattedDate = eventDate.toLocaleDateString();
  const isoDate = eventDate.toISOString().split('T')[0];
  
  return (
    <section className="latest-event" aria-labelledby="latest-report-heading">
      <h4 id="latest-report-heading">Latest Report</h4>
      <p aria-label={`Report: ${event.eventTitle} for fiscal year ${event.fiscalYear}`}>
        {event.eventTitle} - {event.fiscalYear}
      </p>
      <time 
        dateTime={isoDate}
        aria-label={`Report date: ${formattedDate}`}
      >
        {formattedDate}
      </time>
    </section>
  );
};