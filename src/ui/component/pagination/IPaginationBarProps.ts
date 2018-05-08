interface IPaginationBarProps {
    showPrev: boolean;
    showNext: boolean;
    onNext(): void;
    onPrev(): void;
}

export { IPaginationBarProps };