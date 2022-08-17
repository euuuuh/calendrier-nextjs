import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import Header from "../components/header/Header";
import GuideModal from "../components/modals/guide_modal/GuideModal";

import { TypeDay } from "../types/TypeDay";
import { TypeNav } from "../types/TypeNav";
import { TypeWeekDays } from "../types/TypeWeekDays";

import { LoadCalendar } from "../utils/load-calendar";

const Home: NextPage = () => {
  const dt = new Date();

  const [showInfoModal, setShowInfoModal] = useState<"flex" | "none">("none");

  const [days, setDays] = useState<TypeDay[]>([]);
  const [paddingDays, setPaddingDays] = useState<TypeWeekDays[]>([]);
  const [dateDisplay, setDateDisplay] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nav, setNav] = useState<TypeNav>({
    // Utilisé pour la navigation entre les mois (back et next)
    month: dt.getMonth(),
    year: dt.getFullYear(),
  });

  // Charger le calendrier
  useEffect(() => {
    setIsLoading(true);
    const [_paddingDays, _days, _dateDisplay] = LoadCalendar(nav);

    setDays(_days as TypeDay[]);
    setPaddingDays(_paddingDays as TypeWeekDays[]);
    setDateDisplay(_dateDisplay as string);

    setIsLoading(false);
  }, [nav]);

  // Changer de mois (avancer)
  const ClickNext = () => {
    if (nav.month === 11) {
      setNav({ month: 0, year: nav.year + 1 });
    } else {
      setNav({ month: nav.month + 1, year: nav.year });
    }
  };

  // Changer de mois (reculer)
  const ClickBack = () => {
    if (nav.month === 0) {
      setNav({ month: 11, year: nav.year - 1 });
    } else {
      setNav({ month: nav.month - 1, year: nav.year });
    }
  };

  return (
    <>
      <Head>
        <title>Calendar</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header
        clickBack={() => ClickBack}
        clickNext={() => ClickNext}
        showInfoModal={() => setShowInfoModal((prev) => (prev === "flex" ? "none" : "flex"))}
      />

      {/* Guide modal */}
      <GuideModal display={showInfoModal} CloseModal={() => setShowInfoModal("none")} />

      <main>{isLoading ? <span>loading...</span> : <span>{dateDisplay}</span>}</main>
    </>
  );
};

export default Home;
