declare var io : {
    connect(url: string,data: any): Socket;
};
interface Socket {
    on(event: string, callback: (data: any) => void );
    emit(event: string, data: any);
}