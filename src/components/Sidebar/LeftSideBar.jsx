import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFillVolumeUpFill } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight, FaList, FaPlay, FaSearch } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { RiBookShelfFill, RiBookShelfLine } from "react-icons/ri";
import "./LeftSidebar.css";

const libraryItems = [
    { id: 1, type: "playlist", name: "Liked Songs", details: "Playlist • 228 songs", image: "https://i.imgur.com/yourimage.png", pinned: true },
    { id: 2, type: "artist", name: "Camellia", details: "Artist", image: "https://i.imgur.com/yourimage.png", playing: true },
    { id: 3, type: "artist", name: "BlackY", details: "Artist", image: "https://i.imgur.com/yourimage.png" }
];

const Left_Sidebar = () => {
    const categoryRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [sidebarWidth, setSidebarWidth] = useState("20%");
    const [left_scroll, setLeft_scroll] = useState(0);
    const [right_scroll, setRight_scroll] = useState(1);
    const [display, setDisplay] = useState("flex");
    const [flexDirection, setFlexDirection] = useState("row");

    const { t } = useTranslation();

    const scrollLeft = () => {
        toggle_scrollButton(0, 1);
        if (categoryRef.current) {
            categoryRef.current.scrollBy({ left: -170, behavior: "smooth" });
        }
    };

    const toggle_flexDirection = () => {
        setFlexDirection((direction) => (direction === "row" ? "column" : "row"));
    }

    //Scroll button controls
    const scrollRight = () => {
        toggle_scrollButton(1, 0);
        if (categoryRef.current) {
            categoryRef.current.scrollBy({ left: 170, behavior: "smooth" });
        }
    };

    const toggle_scrollButton = (state1, state2) => {
        setLeft_scroll(state1);
        setRight_scroll(state2);
    };

    // Opacity: 0 <=> 1
    const toggle_display = () => {
        setDisplay((prevDisplay) => (prevDisplay === "flex" ? "none" : "flex"));
    };

    // Sidebar width: 20% <=> 35%
    const toggle_sidebarWidth = () => {
        setSidebarWidth((prevWidth) => (prevWidth === "20%" ? "35%" : "20%"));
        if (sidebarWidth === "20%") toggle_scrollButton(0, 0);
        else toggle_scrollButton(0, 1);
    };
    // any <=> 56px
    const toggle_sidebarWidth2 = () => {
        setSidebarWidth((prevWidth) => (prevWidth === "56px" ? "20%" : "56px"));
        toggle_display();
        toggle_flexDirection();
    };

    return (
        <div className="ls-left-sidebar" style={{ width: sidebarWidth, paddingInline: sidebarWidth === "56px" ? "4px" : "16px" }}>
            <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
                <div className="ls-library-header" style={{ flexDirection: flexDirection }}>
                    <button className="com-vertical-align ls-library-title com-glow-only" title={t("leftSidebar.expandLib")} onClick={toggle_sidebarWidth2}>
                        <div>
                            {sidebarWidth === "56px" ? (<RiBookShelfLine size={32} color="white" />) :
                                (<RiBookShelfFill size={32} color="white" />)}
                        </div>
                        <span style={{ display: display }}>{t("leftSidebar.library")}</span>
                    </button>
                    <div className="ls-add-expand com-vertical-align">
                        <button className="com-glow-only com-vertical-align" title={t("leftSidebar.createListDesc")}>
                            <IoMdAdd size={20} color="white" />
                            <span className="ls-create-span" style={{ display: sidebarWidth === "35%" ? "flex" : "none", marginInline: sidebarWidth === "20%" ? "0" : "8px" }}>{t("leftSidebar.createList")}</span>
                        </button>
                        <button className="com-glow-only" style={{ backgroundColor: "rgba(0,0,0,0)", display: display }} onClick={toggle_sidebarWidth}>
                            <FaArrowRight size={20} color="#8a8a8a" style={{ transform: sidebarWidth === "20%" ? "rotate(0deg)" : "rotate(180deg)" }} />
                        </button>
                    </div>
                </div>
                <div className="ls-category-search" style={{ flexDirection: sidebarWidth === "20%" ? "column" : "row" }}>
                    <div className="ls-category-container" style={{ display: display }}>
                        <button className="ls-scroll-btn ls-left com-glow-zoom com-vertical-align" onClick={scrollLeft} style={{ opacity: left_scroll }}><FaChevronLeft /></button>
                        <div className="ls-category-holder" ref={categoryRef}>
                            <button>{t("leftSidebar.playlists")}</button>
                            <button>{t("leftSidebar.artists")}</button>
                            <button>Albums</button>
                            <button>Podcasts</button>
                        </div>
                        <button className="ls-scroll-btn ls-right com-glow-zoom com-vertical-align" onClick={scrollRight} style={{ opacity: right_scroll }}><FaChevronRight />
                        </button>
                    </div>

                    <div className="ls-search-sort" style={{ display: display }}>
                        <button className="com-glow-only"><FaSearch size={14} color="white" /></button>
                        <button className="ls-sort-btn com-glow-zoom com-vertical-align">
                            <span>{t("leftSidebar.recents")}</span>
                            <FaList />
                        </button>
                    </div>
                </div>
            </div>

            <div className="ls-library-items">
                {libraryItems.map((item) => (
                    <div key={item.id} className={`ls-library-item ${selectedItem === item.id ? "ls-selected" : ""}`} onClick={() => setSelectedItem(item.id)}>
                        <div className="ls-library-item-img com-vertical-align">
                            <div className="ls-img-play-btn"><FaPlay /></div>
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className="com-vertical-align" style={{ justifyContent: "space-between", display: display }}>
                            <div className="ls-library-item-info">
                                <span className="ls-library-item-name">{item.name}</span>
                                <span className="ls-library-item-details">{item.details}</span>
                            </div>
                            {item.pinned && <span className="ls-pinned" style={{ right: 0 }}>📌</span>}
                            {item.playing && <BsFillVolumeUpFill size={16} color="green" style={{ right: 0 }} />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Left_Sidebar;
