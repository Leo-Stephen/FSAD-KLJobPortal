package klu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import klu.model.Jobs;
import klu.model.JobManager;

@RestController
@RequestMapping("/jobs")
@CrossOrigin(origins = "http://localhost:5173")
public class JobsController {

    @Autowired
    private JobManager JM;

    @PostMapping("/create")
    public String create(@RequestBody Jobs J) {
        return JM.createJob(J);
    }
    @GetMapping("/read")
    public String read() {
    	return JM.readJobs();
    }
    @GetMapping("/getdata/{id}")
    public String getData(@PathVariable("id") Long ID) {
    	return JM.getData(ID);
    }
    @PutMapping("/update")
    public String update(@RequestBody Jobs J) {
    	return JM.updateJob(J);
    }
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable("id") Long ID) {
    	return JM.deleteJob(ID);
    }
}