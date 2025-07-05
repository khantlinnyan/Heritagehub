import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowRight } from "lucide-react";

export default function TripCard() {
  return (
    <Card className="w-64 gap-7">
      <CardHeader>
        <CardTitle>Shwezigone</CardTitle>
      </CardHeader>
      <CardContent className="gap-3 flex items-center flex-col">
        <CardDescription>
          Shwezigone is a popular tourist destination in Myanmar.
        </CardDescription>
        <CardAction>
          <ArrowRight />
        </CardAction>
      </CardContent>
    </Card>
  );
}
