import React, { useCallback, useEffect, useRef } from "react";
import styles from './styles.module.css'

export const ModalContent = ({ children, onDismiss }: { children: React.ReactChildren; onDismiss: any }) => {

    const overlayRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const wrapperRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    const onClick = useCallback(
        (event: any) => {
            if (event.target === overlayRef.current || event.target === wrapperRef.current) {
                if (onDismiss) {
                    onDismiss();
                }
            }
        }, [onDismiss, overlayRef, wrapperRef]
    );


    return (
        <div className={styles.overlay} ref={overlayRef} onClick={onClick}>
            <div className={styles.container} ref={wrapperRef}>
                { children }
            </div>
        </div>
    )
}

export const Modal = ({ router, routeId, children, modalContent }: { router: any; routeId: any; children: React.ReactChildren; modalContent: React.ReactChildren; }) => {

    const onDismiss = useCallback(
      () => {
        if (routeId) {
            router.back();
        }
      },
      [routeId, router],
    );

    const onEscKeyDown = useCallback(
      (event: React.KeyboardEvent<any>) => {
        if (event.key == 'Escape') {
            onDismiss();
        }
      },
      [onDismiss]
    );
    
    useEffect(() => {
        document.addEventListener("keydown", () => onEscKeyDown);

        return () => {
            document.removeEventListener("keydown", () => onEscKeyDown);
        }
    }, [onEscKeyDown])

    return (
        <>
            { routeId && <ModalContent children={modalContent} onDismiss={onDismiss} />}
            { children }
        </>
    );
}