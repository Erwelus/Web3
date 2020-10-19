package Ervelus.jsf;

import Ervelus.dao.EntryDao;
import Ervelus.dao.SessionControl;
import Ervelus.model.Entry;

import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@ManagedBean
@ApplicationScoped
public class EntryBean {
    private Entry newEntry = new Entry();
    private ArrayList<Entry> entries = new ArrayList<>();
    private EntryDao entryDao = new EntryDao();
    private SessionControl sessionControl = new SessionControl();

    public EntryBean(){
        sessionControl.setSession();
    }

    public ArrayList<Entry> getEntries() {
        try {
            return entryDao.getEntries(sessionControl.getSession_id());
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }return null;
    }

    public void addEntry(){
        try {
            //System.out.println(newEntry.getX());
            newEntry.setSession_id(sessionControl.getSession_id());
            newEntry.check();
            entryDao.addEntry(newEntry);
            entries.add(newEntry);
            //System.out.println("added");
        } catch (SQLException ex) {
            ex.printStackTrace();
        }catch (NullPointerException ignored){
        }finally{
            newEntry = new Entry();
        }
    }

    public void clearEntries(){
        try {
            entryDao.deleteEntries(sessionControl.getSession_id());
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public Entry getNewEntry() {
        return newEntry;
    }

    public void setNewEntry(Entry newEntry) {
        this.newEntry = newEntry;
    }
}
