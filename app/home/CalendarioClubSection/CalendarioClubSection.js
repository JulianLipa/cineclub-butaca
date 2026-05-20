"use client";

import React, { useMemo, useRef } from "react";
import SectionTitleIcon from "@/shared/components/section-title/SectionTitleIcon";

const weekDays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const getMonthData = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startWeekDay = (firstDay.getDay() + 6) % 7;
  const daysInMonth = lastDay.getDate();

  const days = [];

  for (let i = 0; i < startWeekDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return days;
};

const months = Array.from({ length: 12 }, (_, i) => i);

const CalendarioClubSection = () => {
  const scrollRef = useRef(null);

  const today = new Date();
  const year = today.getFullYear();

  const scrollToMonth = (index) => {
    const container = scrollRef.current;
    if (!container) return;

    const child = container.children[index];
    if (child) {
      child.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  };

  return (
    <div>
      <SectionTitleIcon icon="calendario">Calendario del club</SectionTitleIcon>

      <div style={styles.wrapper}>
        <div ref={scrollRef} style={styles.scroller}>
          {months.map((monthIndex) => {
            const days = getMonthData(year, monthIndex);

            return (
              <div key={monthIndex} style={styles.monthCard}>
                <h3 style={styles.monthTitle}>
                  {new Date(year, monthIndex).toLocaleString("es-AR", {
                    month: "long",
                  })}
                </h3>

                {/* Weekdays */}
                <div style={styles.weekRow}>
                  {weekDays.map((d) => (
                    <div key={d} style={styles.weekDay}>
                      {d}
                    </div>
                  ))}
                </div>

                {/* Days */}
                <div style={styles.daysGrid}>
                  {days.map((day, i) => {
                    const isToday =
                      day === today.getDate() &&
                      monthIndex === today.getMonth();

                    return (
                      <div
                        key={i}
                        style={{
                          ...styles.day,
                          background: isToday ? "#111" : "transparent",
                          color: isToday ? "#fff" : "#333",
                        }}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick nav */}
        <div style={styles.nav}>
          {months.map((m) => (
            <button
              key={m}
              onClick={() => scrollToMonth(m)}
              style={styles.navBtn}
            >
              {new Date(year, m).toLocaleString("es-AR", {
                month: "short",
              })}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    marginTop: 20,
  },

  scroller: {
    display: "flex",
    overflowX: "auto",
    scrollSnapType: "x mandatory",
    gap: 16,
    paddingBottom: 10,
  },

  monthCard: {
    minWidth: "280px",
    flex: "0 0 auto",
    border: "1px solid #e5e5e5",
    borderRadius: 12,
    padding: 12,
    scrollSnapAlign: "center",
    background: "#fff",
  },

  monthTitle: {
    textTransform: "capitalize",
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 8,
  },

  weekRow: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    fontSize: 10,
    color: "#666",
    marginBottom: 6,
  },

  weekDay: {
    textAlign: "center",
  },

  daysGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 4,
  },

  day: {
    height: 26,
    fontSize: 11,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    border: "1px solid #f0f0f0",
  },

  nav: {
    display: "flex",
    gap: 6,
    marginTop: 12,
    flexWrap: "wrap",
  },

  navBtn: {
    fontSize: 11,
    padding: "4px 8px",
    borderRadius: 8,
    border: "1px solid #ddd",
    background: "transparent",
    cursor: "pointer",
  },
};

export default CalendarioClubSection;
